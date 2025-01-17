<?php

declare(strict_types=1);

namespace Drupal\Tests\drupal_cms_starter\Functional;

use Composer\InstalledVersions;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\State\StateInterface;
use Drupal\Tests\BrowserTestBase;
use Symfony\Component\Process\PhpExecutableFinder;
use Symfony\Component\Process\Process;

/**
 * @group drupal_cms_starter
 */
class ComponentValidationTest extends BrowserTestBase {

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * A version of RecipeTestTrait::applyRecipe() that doesn't time out.
   */
  private function applyRecipe(string $path, array $options = []): void {
    $arguments = [
      (new PhpExecutableFinder())->find(),
      'core/scripts/drupal',
      'recipe',
      // Never apply recipes interactively.
      '--no-interaction',
      ...$options,
      $path,
    ];
    $process = (new Process($arguments))
      ->setWorkingDirectory($this->getDrupalRoot())
      ->setEnv([
        'DRUPAL_DEV_SITE_PATH' => $this->siteDirectory,
        // Ensure that the command boots Drupal into a state where it knows it's
        // a test site.
        // @see drupal_valid_test_ua()
        'HTTP_USER_AGENT' => drupal_generate_test_ua($this->databasePrefix),
      ])
      ->setTimeout(0);

    $process->run();
    $this->assertSame(0, $process->getExitCode(), $process->getErrorOutput());
    // Applying a recipe:
    // - creates new checkpoints, hence the "state" service in the test runner
    //   is outdated
    // - may install modules, which would cause the entire container in the test
    //   runner to be outdated.
    // Hence the entire environment must be rebuilt for assertions to target the
    // actual post-recipe-application result.
    // @see \Drupal\Core\Config\Checkpoint\LinearHistory::__construct()
    $this->rebuildAll();
  }

  public function test(): void {
    // Apply this recipe once. It is a site starter kit and therefore unlikely
    // to be applied again in the real world.
    $dir = InstalledVersions::getInstallPath('drupal/drupal_cms_starter');
    $this->applyRecipe($dir);

    // The front page should be accessible to everyone.
    $this->drupalGet('<front>');
    $assert_session = $this->assertSession();
    $assert_session->statusCodeEquals(200);
    // Also, the front page should be "/", instead of "/home".
    $assert_session->addressEquals('/');

    $editor = $this->drupalCreateUser();
    $editor->addRole('content_editor')->save();
    $this->drupalLogin($editor);

    // The navigation should have a link to the dashboard.
    $assert_session->elementAttributeContains('named', ['link', 'Dashboard'], 'class', 'toolbar-button--icon--navigation-dashboard');

    // Read our `composer.json` file to get the list of optional recipes.
    $composer = file_get_contents($dir . '/composer.json');
    $composer = json_decode($composer, TRUE, flags: JSON_THROW_ON_ERROR);
    $optional_recipes = array_keys($composer['suggest'] ?? []);

    // Test that all the optional recipes can be applied on top of this one.
    foreach ($optional_recipes as $name) {
      $this->applyRecipe(InstalledVersions::getInstallPath($name));
    }

    $node_types = $this->container->get(EntityTypeManagerInterface::class)
      ->getStorage('node_type')
      ->getQuery()
      ->execute();
    // There should be at least one content type.
    $this->assertNotEmpty($node_types);
    // All content types:
    // - Should not show a summary field on their edit form.
    // - Should only have one text format to choose from, so there should not
    //   be any choice.
    foreach ($node_types as $node_type) {
      $this->drupalGet('/node/add/' . $node_type);
      $assert_session->fieldNotExists('Summary');
      $assert_session->fieldNotExists('Text format');

      if ($node_type === 'page') {
        $page = $this->getSession()->getPage();
        $page->fillField('Title', 'Test page');
        $page->fillField('Description', "I'll do this later.");
        $assert_session->elementExists('css', '#edit-actions')->pressButton('Save');
        // Pages should have the expected path aliases.
        $assert_session->addressMatches('/\/test-page$/');
      }

      $this->drupalCreateNode([
        'type' => $node_type,
        'title' => "Search for this $node_type",
        'moderation_state' => 'published',
      ]);
    }
    $this->drupalLogout();

    // If we apply the search recipe, the content we just created in the loop
    // above should all be searchable.
    $dir = InstalledVersions::getInstallPath('drupal/drupal_cms_search');
    $this->applyRecipe($dir);

    // The creation of the search index should have reset the last cron run time
    // to zero.
    /** @var \Drupal\Core\State\StateInterface $state */
    $state = $this->container->get(StateInterface::class);
    $last_cron_run = $state->get('system.cron_last');
    $this->assertSame('0', $last_cron_run);
    $last_cron_run = intval($last_cron_run);

    // Thanks to automated_cron, this request will trigger a cron run.
    $this->drupalGet('/search');

    // The cron work may outlive the HTTP request, so wait for it to finish.
    $seconds_waited = 0;
    while ($last_cron_run === 0) {
      $state->resetCache();
      $last_cron_run = (int) $state->get('system.cron_last');

      // We've given it a whole minute; it should be done by now.
      if (++$seconds_waited === 60) {
        break;
      }
      else {
        sleep(1);
      }
    }
    $this->assertGreaterThan(0, $last_cron_run);

    // The content we created should now be searchable.
    foreach ($node_types as $node_type) {
      $page->fillField('Search keywords', $node_type);
      $page->pressButton('Find');
      $assert_session->linkExists("Search for this $node_type");
    }

    // If you have permission to administer modules, you should see a dedicated
    // tab to browse recipes.
    $account = $this->drupalCreateUser(['administer modules']);
    $this->drupalLogin($account);
    $this->drupalGet('/admin/modules/browse/recipes');
    $assert_session->statusCodeEquals(200);
  }

}

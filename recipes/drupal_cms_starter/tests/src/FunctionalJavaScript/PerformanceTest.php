<?php

declare(strict_types=1);

namespace Drupal\Tests\drupal_cms_starter\FunctionalJavascript;

use Composer\InstalledVersions;
use Drupal\FunctionalJavascriptTests\PerformanceTestBase;
use Drupal\FunctionalTests\Core\Recipe\RecipeTestTrait;

/**
 * Tests the performance of the drupal_cms_starter recipe.
 *
 * Stark is used as the default theme so that this test is not Olivero specific.
 *
 * @group OpenTelemetry
 * @group #slow
 * @requires extension apcu
 */
class PerformanceTest extends PerformanceTestBase {

  use RecipeTestTrait;

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * Tests performance of the starter recipe.
   */
  public function testPerformance(): void {
    $dir = InstalledVersions::getInstallPath('drupal/drupal_cms_starter');
    $this->applyRecipe($dir);

    $this->doTestAnonymousFrontPage();
    $this->doTestEditorFrontPage();
  }

  /**
   * Check the anonymous front page with a hot cache.
   */
  protected function doTestAnonymousFrontPage(): void {
    $this->drupalGet('');
    $this->drupalGet('');

    // Test frontpage.
    $performance_data = $this->collectPerformanceData(function () {
      $this->drupalGet('');
    }, 'drupalCMSAnonymousFrontPage');
    $this->assertSession()->elementExists('css', 'article.node');
    $this->assertSame([], $performance_data->getQueries());
    $this->assertSame(0, $performance_data->getQueryCount());
    $this->assertSame(2, $performance_data->getCacheGetCount());
    $this->assertSame(0, $performance_data->getCacheSetCount());
    $this->assertSame(0, $performance_data->getCacheDeleteCount());
    $this->assertSame(0, $performance_data->getCacheTagChecksumCount());
    $this->assertSame(1, $performance_data->getCacheTagIsValidCount());
    $this->assertSame(0, $performance_data->getCacheTagInvalidationCount());
    $this->assertSame(2, $performance_data->getStylesheetCount());
    $this->assertSame(1, $performance_data->getScriptCount());
    $this->assertLessThan(75000, $performance_data->getStylesheetBytes());
    $this->assertLessThan(16500, $performance_data->getScriptBytes());
  }

  /**
   * Log in with the editor role and visit the front page with a warm cache.
   */
  protected function doTestEditorFrontPage(): void {
    $editor = $this->drupalCreateUser();
    $editor->addRole('content_editor')->save();
    $this->drupalLogin($editor);
    // Warm various caches. Drupal CMS redirects the front page to /home, so visit that directly.
    // @todo https://www.drupal.org/project/drupal_cms/issues/3493615
    $this->drupalGet('');
    $this->drupalGet('');

    // Test frontpage.
    $performance_data = $this->collectPerformanceData(function () {
      $this->drupalGet('');
    }, 'drupalCMSEditorFrontPage');
    $assert_session = $this->assertSession();
    $assert_session->elementAttributeContains('named', ['link', 'Dashboard'], 'class', 'toolbar-button--icon--navigation-dashboard');
    $assert_session->elementExists('css', 'article.node');
    // @todo assert individual queries once Coffee does not result in an
    // additional AJAX request on every request.
    // @see https://www.drupal.org/project/coffee/issues/2453585
    $this->assertSame(9, $performance_data->getQueryCount());
    $this->assertSame(86, $performance_data->getCacheGetCount());
    $this->assertSame(0, $performance_data->getCacheSetCount());
    $this->assertSame(0, $performance_data->getCacheDeleteCount());
    $this->assertSame(0, $performance_data->getCacheTagChecksumCount());
    $this->assertSame(33, $performance_data->getCacheTagIsValidCount());
    $this->assertSame(0, $performance_data->getCacheTagInvalidationCount());
    $this->assertSame(3, $performance_data->getStylesheetCount());
    $this->assertSame(3, $performance_data->getScriptCount());
    $this->assertLessThan(350000, $performance_data->getStylesheetBytes());
    $this->assertLessThan(320000, $performance_data->getScriptBytes());
  }

}

<?php

declare(strict_types=1);

namespace Drupal\Tests\drupal_cms_seo_tools\Functional;

use Drupal\field\Entity\FieldConfig;
use Drupal\FunctionalTests\Core\Recipe\RecipeTestTrait;
use Drupal\Tests\BrowserTestBase;

/**
 * @group drupal_cms_seo_tools
 */
class ComponentValidationTest extends BrowserTestBase {

  use RecipeTestTrait;

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * {@inheritdoc}
   */
  protected static $modules = ['node'];

  public function test(): void {
    $dir = realpath(__DIR__ . '/../../..');

    // Create a content type so we can test the changes made by the recipe.
    $node_type = $this->drupalCreateContentType(['type' => 'test'])->id();

    // The recipe should apply cleanly.
    $this->applyRecipe($dir);
    // Apply it again to prove that it is idempotent.
    $this->applyRecipe($dir);

    // There should be an SEO image field on our test content type, referencing
    // image media.
    $field_settings = FieldConfig::loadByName('node', $node_type, 'field_seo_image')?->getSettings();
    $this->assertIsArray($field_settings);
    $this->assertSame('default:media', $field_settings['handler']);
    $this->assertContains('image', $field_settings['handler_settings']['target_bundles']);
  }

}

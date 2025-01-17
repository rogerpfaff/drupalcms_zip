<?php

declare(strict_types=1);

namespace Drupal\jsonapi_test_data_type;

/**
 * An object which implements \IteratorAggregate.
 */
class TraversableObject implements \IteratorAggregate {

  public $property = "value";

  /**
   * {@inheritdoc}
   */
  public function getIterator(): \ArrayIterator {
    return new \ArrayIterator();
  }

}
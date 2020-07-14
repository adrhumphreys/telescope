<?php

namespace AdrHumphreys\Telescope\Database;

class RecordedQueries
{
    /**
     * @var array
     */
    private static $queries = [];

    public static function add(string $query): void
    {
        self::$queries[] = $query;
    }

    public static function get(): array
    {
        return self::$queries;
    }
}

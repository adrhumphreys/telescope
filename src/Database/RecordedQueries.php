<?php

namespace AdrHumphreys\Telescope\Database;

class RecordedQueries
{
    /**
     * @var array [['duration' => '50', 'query' => 'select 1;']]
     */
    private static $queries = [];

    public static function add(string $query, float $duration): void
    {
        self::$queries[] = [
            'query' => $query,
            'duration' => $duration,
        ];
    }

    public static function get(): array
    {
        return self::$queries;
    }
}

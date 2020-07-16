<?php

namespace AdrHumphreys\Telescope\Database;

use SilverStripe\ORM\Connect\MySQLDatabase;
use SilverStripe\ORM\DB;

class MySQLQueryRecorder extends MySQLDatabase
{
    protected function benchmarkQuery($sql, $callback, $parameters = array())
    {
        // Lets not record queries to telescope and cause recursion
        // Also lets us pretend we don't impact performance 👏
        if (strpos($sql, 'Telescope_') !== false) {
            return parent::benchmarkQuery($sql, $callback, $parameters);
        }

        // Time the query
        $startTime = microtime(true);
        $result = parent::benchmarkQuery($sql, $callback, $parameters);
        $duarationAsSeconds = microtime(true) - $startTime;
        $duration = round($duarationAsSeconds * 1000, 4);

        // Record the query
        $queryData = DB::inline_parameters($sql, $parameters);
        RecordedQueries::add($queryData, $duration);

        return $result;
    }
}

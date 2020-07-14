<?php

namespace AdrHumphreys\Telescope\Database;

use AdrHumphreys\Telescope\Middleware\RequestMiddleware;
use AdrHumphreys\Telescope\Models\QueryDatum;
use SilverStripe\ORM\Connect\MySQLDatabase;
use SilverStripe\ORM\DB;

class MySQLQueryRecorder extends MySQLDatabase
{
    protected function benchmarkQuery($sql, $callback, $parameters = array())
    {
        if (strpos($sql, 'Telescope_') !== false) {
            return parent::benchmarkQuery($sql, $callback, $parameters);
        }

        // Record the queries
        $queryData = DB::inline_parameters($sql, $parameters);
        RecordedQueries::add($queryData);

        return parent::benchmarkQuery($sql, $callback, $parameters);
    }
}

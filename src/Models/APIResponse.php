<?php

namespace AdrHumphreys\Telescope\Models;

interface APIResponse
{
    public function getAPIData(bool $includeRelations = false): array;
}

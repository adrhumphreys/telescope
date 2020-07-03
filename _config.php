<?php

use AdrHumphreys\Telescope\Models\DumpDatum;
use Symfony\Component\VarDumper\Cloner\VarCloner;
use Symfony\Component\VarDumper\Dumper\HtmlDumper;
use Symfony\Component\VarDumper\VarDumper;

// You need this file if you don't have anything in the _config folder. If that folder exists
// and is not empty then you can delete this file.
$htmlDumper = new HtmlDumper();
$htmlDumper->setDumpHeader('');

VarDumper::setHandler(function ($var) use ($htmlDumper) {
    DumpDatum::recordDump($htmlDumper->dump(
        (new VarCloner)->cloneVar($var), true
    ));
});

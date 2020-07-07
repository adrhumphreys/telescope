<?php

namespace AdrHumphreys\Telescope\Controllers;

use SilverStripe\Control\Controller;

class Telescope extends Controller
{
    /**
     * @var string[]
     */
    private static $allowed_actions = [
        'index'
    ];

    public function index()
    {
        return $this->renderWith('Telescope');
    }
}

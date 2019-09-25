<?php

use humhub\widgets\BaseMenu;
use themroc\humhub\modules\mobile_sidebar\Events;

return [
	'id'=> 'mobile-sidebar',
	'class'=> 'themroc\humhub\modules\mobile_sidebar\Module',
	'namespace'=> 'themroc\humhub\modules\mobile_sidebar',
	'events'=> [
		[ humhub\modules\space\widgets\Sidebar::class, BaseMenu::EVENT_INIT, [Events::class, 'onInit'] ],
		[ humhub\modules\user\widgets\ProfileSidebar::class, BaseMenu::EVENT_INIT, [Events::class, 'onInit'] ],
		[ humhub\modules\dashboard\widgets\Sidebar::class, BaseMenu::EVENT_INIT, [Events::class, 'onInit'] ],
		[ humhub\modules\directory\widgets\Sidebar::class, BaseMenu::EVENT_INIT, [Events::class, 'onInit'] ],
	],
];

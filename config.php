<?php

use themroc\humhub\modules\mobile_sidebar\Events;
#use humhub\modules\admin\widgets\AdminMenu;
#use humhub\widgets\TopMenu;
use humhub\modules\space\widgets\Sidebar;
use humhub\modules\user\widgets\ProfileSidebar;

return [
	'id' => 'mobile-sidebar',
	'class' => 'themroc\humhub\modules\mobile_sidebar\Module',
	'namespace' => 'themroc\humhub\modules\mobile_sidebar',
	'events' => [
		[ Sidebar::class, Sidebar::EVENT_INIT, [Events::class, 'onSpaceInit'] ],
		[ ProfileSidebar::class, ProfileSidebar::EVENT_INIT, [Events::class, 'onUserInit'] ],
	],
];

<?php

namespace themroc\humhub\modules\mobile_sidebar;

use themroc\humhub\modules\mobile_sidebar\assets\Assets;
use themroc\humhub\modules\mobile_sidebar\widgets\SidebarJs;

class Events
{
	public static function onInit($event)
	{
		$event->sender->view->registerAssetBundle(Assets::className());
		$event->sender->addWidget(SidebarJs::className(), []);
	}
}

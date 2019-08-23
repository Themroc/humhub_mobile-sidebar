<?php

namespace themroc\humhub\modules\mobile_sidebar;

use Yii;
use yii\helpers\Url;
use themroc\humhub\modules\mobile_sidebar\assets\Assets;
use themroc\humhub\modules\mobile_sidebar\widgets\SidebarJs;

class Events
{
    public static function onSpaceInit($event)
    {
        Events::widgetInit($event, 'space');
    }

    public static function onUserInit($event)
    {
        Events::widgetInit($event, 'user');
    }

    public static function widgetInit($event, $type)
    {
        $event->sender->view->registerAssetBundle(Assets::className());
        $event->sender->addWidget(SidebarJs::className(), [
            'type' => $type,
        ], [
            'sortOrder' => -999999,
        ]);

    }
}

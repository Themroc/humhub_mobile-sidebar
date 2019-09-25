<?php

namespace themroc\humhub\modules\mobile_sidebar;

class Module extends \humhub\components\Module
{
	/**
	* @inheritdoc
	*/
	public function disable()
	{
		// Cleanup all module data, don't remove the parent::disable()!!!
		parent::disable();
	}
}

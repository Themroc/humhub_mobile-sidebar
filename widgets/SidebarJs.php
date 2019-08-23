<?php

namespace themroc\humhub\modules\mobile_sidebar\widgets;

use humhub\components\Widget;

class SidebarJs extends Widget
{
	public $type;

	/**
	 * @inheritdoc
	 */
	public function run()
	{
		$this->getView()->registerJsConfig('mobile_sidebar', [ 'type' => $this->type ]);
	}
}

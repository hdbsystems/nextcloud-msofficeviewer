<?php

/**
 * Nextcloud - MS Office Documents Viewer App
 *
 * @author Sergio Souza
 * @copyright 2017 Sergio Souza sergio.henrique.souza@gmail.com
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\MSOfficeViewer\Controller;

use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\ContentSecurityPolicy;

class DisplayController extends Controller {

        private $urlGenerator;

        public function __construct($AppName, IRequest $request, IURLGenerator $urlGenerator){
                parent::__construct($AppName, $request);
                $this->urlGenerator = $urlGenerator;
        }

        /**
         * @NoAdminRequired
         * @NoCSRFRequired
         */
        public function previewDocumet() {
                    $params = [
                'urlGenerator' => $this->urlGenerator
            ];
                $response = new TemplateResponse('msofficeviewer', 'viewer', $params, 'blank');  // templates/viewer.php

                $policy = new ContentSecurityPolicy();
                $policy->addAllowedChildSrcDomain('\'self\'');
                $policy->addAllowedFontDomain('data:');
                $policy->addAllowedImageDomain('*');
                $policy->allowEvalScript(false);
                $response->setContentSecurityPolicy($policy);

                return $response;

        }

}

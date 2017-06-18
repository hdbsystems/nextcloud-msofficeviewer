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

(function (OCA) {

    OCA.MSOfficeViewer = _.extend({}, OCA.MSOfficeViewer);

    OCA.MSOfficeViewer.FileClick = function (fileName, context) {
        var downloadUrl = context.fileList.getDownloadUrl(fileName);

        if (downloadUrl && downloadUrl !== '#') {
            OC.dialogs.confirm(downloadUrl, fileName, function () {}, true);
        }
    };

    OCA.MSOfficeViewer.FileList = {
        Mimes : [
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
            'application/vnd.ms-word.document.macroEnabled.12',
            'application/vnd.ms-word.template.macroEnabled.12',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
            'application/vnd.ms-excel.sheet.macroEnabled.12',
            'application/vnd.ms-excel.template.macroEnabled.12',
            'application/vnd.ms-excel.addin.macroEnabled.12',
            'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.openxmlformats-officedocument.presentationml.template',
            'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
            'application/vnd.ms-powerpoint.addin.macroEnabled.12',
            'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
            'application/vnd.ms-powerpoint.template.macroEnabled.12',
            'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
            'application/vnd.ms-access'
        ],

        attach: function (fileList) {
            if (fileList.id == "trashbin") {
                return;
            }

            for (i = 0; i < OCA.MSOfficeViewer.FileList.Mimes.length; ++i) {
                fileList.fileActions.registerAction({
                    name: "view",
                    displayName: "Favorite",
                    mime: OCA.MSOfficeViewer.FileList.Mimes[i],
                    permissions: OC.PERMISSION_READ,
                    actionHandler: function (fileName, context) {
                        OCA.MSOfficeViewer.FileClick(fileName, context);
                    }
                });
                fileList.fileActions.setDefault(OCA.MSOfficeViewer.FileList.Mimes[i], "view");
            }
        }

    };

})(OCA);

OC.Plugins.register("OCA.Files.FileList", OCA.MSOfficeViewer.FileList);

UI KIT for some unusual features

Components:
* ClipboardToApi

#ClipboardToApi
Get a files/images from clipboard and send they to remote REST api.
##Usage
```jsx
import { ClipboardToApi } from '@garphild/garphild-ui';
or
import ClipboardToApi from '@garphild/garphild-ui/ClipboardToApi';

<ClipboardToApi apiUrl="/api/uploads" enabled>
  ...
</ClipboardToApi>
```
## Properties
* apiUrl - URL of remote api
* enabled - allow intercept paste event

## Callbacks
* onFileFound - fires when paste event detected and clipboard has files/images before upload
* onUploadFail - fires when remote api response is not 2xx
* onUploadSuccess - fires when upload is successful

```jsx
<ClipboardToApi
  apiUrl="/api/uploads"
  enabled
  onFileFound={(file) => { /* Do something */ }}
  onUploadFail={(error, file) => { /* Do something */ }}
  onUploadSuccess={(responce, file) => { /* Do something */ }}
>
  ...
</ClipboardToApi>
```

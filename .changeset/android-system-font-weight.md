---
"@ui-kitten/components": patch
---

On Android, text with the default `System` font family now keeps its exact `fontWeight`. React Native Android treats any `fontFamily` as a custom family and rounds the weight to regular or bold, so `500` / `600` text (subtitles, labels, radio and checkbox text, avatar initials) rendered regular. Styles resolved from the theme now leave the family unset when it is `System` on Android; iOS and custom families are unchanged.

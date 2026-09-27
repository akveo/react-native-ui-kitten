---
"@ui-kitten/moment": patch
---

`MomentDateService.createDate` now builds a local-time moment, matching `today()` and `parse()`. It used `moment.utc`, so calendar dates constructed by the service drifted from "today" by the UTC offset.

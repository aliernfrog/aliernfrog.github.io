/*
  This file is basically a shortcut to the static tags.json
  as accessing it from build output might be needed.
*/

import tags from "../static/values/tags.json" with { type: "json" }

export default tags;
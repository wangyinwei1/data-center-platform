export function random6() {
  return new Date()
    .getTime()
    .toString()
    .substr(-6, 6)
}

import { downGeneralExcel } from "../services/api"
import FileSaver from "file-saver"

export const downExcel = async (url, params = {}) => {
  let data = await downGeneralExcel(url, params)
  const blob = new Blob([data], { type: "application/vnd.ms-excel;" })
  FileSaver.saveAs(blob, "default.xls")
}

import { Store } from "redux";
import { getProjects } from "../api";

export const modulesInit = (store: Store) => {
  getProjects().then(res => {
    console.log(res,store,'modules')
  })
  // store.dispatch()
}

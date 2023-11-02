import { EntityState } from "@reduxjs/toolkit";
import { HackerNewsPost } from "./domain";

export type HackerNewsState = EntityState<HackerNewsPost>;
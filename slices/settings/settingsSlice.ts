import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { loadSettings, setSetting } from "./settingsActions";
import { ListingType, SortType } from "lemmy-js-client";

export interface SettingsState {
  swipeGestures: boolean;
  displayImagesInFeed: string;
  defaultSort: SortType;
  defaultListingType: ListingType;
  showInstanceForUsernames: boolean;
  loaded: boolean;
  blurNsfw: boolean;
  hideNsfw: boolean;
}

const initialState: SettingsState = {
  swipeGestures: true,
  displayImagesInFeed: "true",
  defaultSort: SortType.Hot,
  defaultListingType: ListingType.All,
  showInstanceForUsernames: false,
  loaded: false,
  blurNsfw: true,
  hideNsfw: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadSettings.fulfilled, (state: SettingsState, action) => {
      if (action.payload) {
        // eslint-disable-next-line guard-for-in
        for (const key in action.payload) {
          state[key] = action.payload[key];
        }
      }

      state.loaded = true;
    });

    builder.addCase(loadSettings.rejected, (state) => {
      state.loaded = true;
    });

    builder.addCase(setSetting.fulfilled, (state, action) => {
      // eslint-disable-next-line guard-for-in
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
    });
  },
});

export const selectSettings = (state: RootState) => state.settings;
export const selectSettingsLoaded = (state: RootState) => state.settings.loaded;
export default settingsSlice.reducer;

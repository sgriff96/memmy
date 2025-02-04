import React from "react";
import { StyleSheet } from "react-native";
import { Pressable, ScrollView, View } from "native-base";
import { useAppDispatch, useAppSelector } from "../../../store";
import { selectFeed, setDropdownVisible } from "../../../slices/feed/feedSlice";
import {
  selectAccounts,
  setCurrentAccount,
} from "../../../slices/accounts/accountsSlice";
import CTable from "../table/CTable";
import CSection from "../table/CSection";
import { Account } from "../../../types/Account";
import CCell from "../table/CCell";
import { resetInstance } from "../../../lemmy/LemmyInstance";

function FeedHeaderDropdownDrawer() {
  const { dropdownVisible } = useAppSelector(selectFeed);
  const accounts = useAppSelector(selectAccounts);

  const dispatch = useAppDispatch();

  const onAccountPress = (account: Account) => {
    dispatch(setCurrentAccount(account));
    dispatch(setDropdownVisible());
  };

  if (!dropdownVisible) return null;

  return (
    <Pressable
      style={styles.container}
      onPress={() => dispatch(setDropdownVisible())}
    >
      <View style={styles.scrollContainer}>
        <ScrollView>
          <CTable>
            <CSection>
              {accounts.map((a, i) => (
                <CCell
                  key={i}
                  cellStyle="Basic"
                  title={`${a.username}@${a.instance}`}
                  accessory="DisclosureIndicator"
                  onPress={() => onAccountPress(a)}
                />
              ))}
            </CSection>
          </CTable>
        </ScrollView>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .5)",
    position: "absolute",
    zIndex: 1,
    top: -10,
    bottom: 0,
    right: 0,
    left: 0,
  },

  scrollContainer: {
    flex: 1,
    alignItems: "stretch",
    width: "100%",
  },

  table: {
    flex: 1,
    marginHorizontal: 15,
  },

  header: {
    flex: 1,
    backgroundColor: "gray",
  },
});

export default FeedHeaderDropdownDrawer;

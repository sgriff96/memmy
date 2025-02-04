import { HStack, IconButton, useTheme } from "native-base";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  IconBookmark,
  IconMessageCircle,
  IconShare2,
} from "tabler-icons-react-native";
import { shareLink } from "../../../helpers/ShareHelper";
import { setResponseTo } from "../../../slices/newComment/newCommentSlice";
import { useAppDispatch } from "../../../store";
import { UsePost } from "../../hooks/post/postHooks";
import IconButtonWithText from "../../ui/common/IconButtonWithText";
import VoteButton from "../../ui/common/VoteButton";

function PostActionBar({ post }: { post: UsePost }) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const onVotePress = (value: -1 | 0 | 1) => {
    post.doVote(value);
  };

  const onCommentPress = () => {
    dispatch(
      setResponseTo({
        post: post.currentPost,
      })
    );

    navigation.push("NewComment");
  };

  const onSharePress = () => {
    shareLink({
      link: post.currentPost.post.ap_id,
      title: post.currentPost.post.name,
    });
  };

  const isUpvoted = post.currentPost?.my_vote === 1;
  const isDownvoted = post.currentPost?.my_vote === -1;

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <HStack justifyContent="center" alignItems="center" space={6} mb={2}>
      <VoteButton
        onPressHandler={() => onVotePress(1)}
        type="upvote"
        isVoted={isUpvoted}
        text={post.currentPost.counts.upvotes}
      />

      <VoteButton
        onPressHandler={() => onVotePress(-1)}
        type="downvote"
        isVoted={isDownvoted}
        text={post.currentPost.counts.downvotes}
      />

      <IconButton
        icon={
          <IconBookmark
            size={25}
            color={post.bookmarked ? colors.white : colors.accentColor}
          />
        }
        onPress={post.doBookmark}
        backgroundColor={
          post.bookmarked ? colors.green[500] : colors.screen[800]
        }
        padding={2}
      />

      <IconButton
        icon={<IconShare2 size={25} color={colors.accentColor} />}
        onPress={onSharePress}
      />

      <IconButtonWithText
        onPressHandler={onCommentPress}
        icon={<IconMessageCircle color={colors.accentColor} size={25} />}
        text={post.currentPost.counts.comments}
        textColor={colors.accentColor}
      />
    </HStack>
  );
}

export default PostActionBar;

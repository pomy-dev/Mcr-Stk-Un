import { theme } from '@/constants/theme';
import { mockPosts } from '@/data/mockData';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageSquare, Plus, Send, ThumbsUp } from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CommunityScreen() {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
          : post
      )
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Community</Text>
        <Text style={styles.headerSubtitle}>Connect with fellow union members</Text>
      </LinearGradient>

      <View style={styles.newPostContainer}>
        <TouchableOpacity style={styles.newPostButton}>
          <LinearGradient
            colors={theme.gradients.secondary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.newPostGradient}
          >
            <Plus size={20} color={theme.colors.text.white} />
            <Text style={styles.newPostText}>Start a Discussion</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image
                source={{ uri: post.authorAvatar || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                style={styles.avatar}
              />
              <View style={styles.postHeaderText}>
                <Text style={styles.authorName}>{post.authorName}</Text>
                <Text style={styles.postDate}>{new Date(post.date).toLocaleDateString()}</Text>
              </View>
            </View>

            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent}>{post.content}</Text>

            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleLike(post.id)}
              >
                <ThumbsUp
                  size={18}
                  color={post.isLiked ? theme.colors.primary : theme.colors.text.secondary}
                  fill={post.isLiked ? theme.colors.primary : 'transparent'}
                />
                <Text
                  style={[
                    styles.actionText,
                    post.isLiked && { color: theme.colors.primary },
                  ]}
                >
                  {post.likes}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <MessageSquare size={18} color={theme.colors.text.secondary} />
                <Text style={styles.actionText}>{post.comments.length}</Text>
              </TouchableOpacity>
            </View>

            {post.comments.length > 0 && (
              <View style={styles.commentsSection}>
                <Text style={styles.commentsTitle}>Comments</Text>
                {post.comments.map((comment) => (
                  <View key={comment.id} style={styles.comment}>
                    <Text style={styles.commentAuthor}>{comment.authorName}</Text>
                    <Text style={styles.commentContent}>{comment.content}</Text>
                    <Text style={styles.commentDate}>
                      {new Date(comment.date).toLocaleDateString()}
                    </Text>
                  </View>
                ))}

                <View style={styles.addCommentContainer}>
                  <TextInput
                    style={styles.commentInput}
                    placeholder="Add a comment..."
                    placeholderTextColor={theme.colors.text.light}
                    multiline
                  />
                  <TouchableOpacity style={styles.sendButton}>
                    <Send size={18} color={theme.colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.white,
  },
  headerSubtitle: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.white,
    opacity: 0.9,
    marginTop: 4,
  },
  newPostContainer: {
    padding: theme.spacing.md,
  },
  newPostButton: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadow.sm,
  },
  newPostGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
  },
  newPostText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.white,
  },
  content: {
    flex: 1,
  },
  postCard: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadow.sm,
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
  },
  postHeaderText: {
    flex: 1,
    justifyContent: 'center',
  },
  authorName: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  postDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.light,
    marginTop: 2,
  },
  postTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  postContent: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.secondary,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  postActions: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  actionText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeight.medium,
  },
  commentsSection: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  commentsTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  comment: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  commentAuthor: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  commentContent: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: 18,
    marginBottom: 4,
  },
  commentDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.light,
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  commentInput: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.primary,
    maxHeight: 80,
  },
  sendButton: {
    padding: theme.spacing.sm,
  },
});

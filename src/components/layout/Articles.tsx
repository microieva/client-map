import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
  Chip,
  Stack,
  Divider,
  Skeleton,
  Paper,
  Container,
  Alert
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  Source as SourceIcon,
  Topic as TopicIcon
} from '@mui/icons-material';
import { ArticleData } from '../../types/api';


interface ClickableArticleProps {
  article: ArticleData;
  onClick: (article: ArticleData) => void;
}

interface ArticlesProps {
  articles: ArticleData[];
  onArticleClick: (article: ArticleData) => void;
  loading: boolean;
  error?: string;
  emptyMessage?: string;
}

// Article component for individual article display
const ClickableArticle: React.FC<ClickableArticleProps> = ({ article, onClick }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Grid xs={12} sm={6} md={4} >
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6
          }
        }}
      >
        <CardActionArea 
          onClick={() => onClick(article)}
          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
        >
          {/* Optional image section */}
          {article.image_url && (
            <Box
              sx={{
                height: 360,
                backgroundImage: `url(${article.image_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top'
              }}
            />
          )}
          
          <CardContent sx={{ flexGrow: 1 }}>
            {/* Topic chip */}
            {article.topic && (
              <Chip
                icon={<TopicIcon />}
                label={article.topic.name}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ mb: 1 }}
              />
            )}
            
            {/* Title */}
            <Typography 
              gutterBottom 
              variant="h6" 
              component="h2"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {article.title}
            </Typography>
            
            {/* Description/Summary */}
            {article.summary && (
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  mb: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {article.summary.content || article.content?.substring(0, 150) + '...'}
              </Typography>
            )}
            
            {/* Metadata footer */}
            <Box sx={{ mt: 'auto' }}>
              <Divider sx={{ my: 1 }} />
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                {/* Source */}
                {article.source && (
                  <Chip
                    icon={<SourceIcon />}
                    label={article.source}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                )}
                
                {/* Date */}
                {article.created_at && (
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(article.created_at)}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

// Loading skeleton component
const ArticleSkeleton: React.FC = () => (
  <Grid xs={12} sm={6} md={4}>
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Skeleton variant="rectangular" height={20} width="60%" sx={{ mb: 1 }} />
        <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} width="80%" />
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="rectangular" height={30} width="40%" />
        </Box>
      </CardContent>
    </Card>
  </Grid>
);

const Articles: React.FC<ArticlesProps> = ({ 
  articles, 
  onArticleClick,
  loading = false,
  error,
  emptyMessage = "No articles found"
}) => {
  
  const handleArticleClick = (article: ArticleData): void => {
    if (onArticleClick) {
      onArticleClick(article);
    } else {
      // Default behavior - open URL in new tab
      if (article.url) {
        window.open(article.url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {loading ? (
          [...Array(6)].map((_, index) => (
            <ArticleSkeleton key={`skeleton-${index}`} />
          ))
        ) : articles.length > 0 ? (
          articles.map((article: ArticleData) => (
            <ClickableArticle
              key={article.id}
              article={article}
              onClick={handleArticleClick}
            />
          ))
        ) : (
          // Empty state
          <Grid xs={12}>
            <Paper 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                backgroundColor: 'grey.50'
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {emptyMessage}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your filters or search criteria
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Articles;

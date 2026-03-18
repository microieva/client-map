import { useEffect, useState, useMemo } from 'react';
import {Box, AppBar, Chip, Skeleton } from '@mui/material';
import { useApi } from '../../context/ApiContext';
import { useApp } from '../../context/AppContext';
import { ArticleData, TopicData } from '../../types/api';
import { useParams } from 'react-router-dom';

const Header = () => {
  const { getTopics, topics, loadingT, articles, loadingA } = useApi();
  const { selectedTopic, setSelectedTopic } = useApp();
  const [countryTopics, setCountryTopics] = useState<string[]>();
  const { countryName } = useParams<{ countryName: string | undefined }>();
  //const nav = useNavigate();


  useEffect(() => {
    if (topics.length === 0 && !loadingT) {
      getTopics();
    }
  }, [topics.length, loadingT, getTopics]);

   useEffect(() => {
    if (countryName && !loadingA && articles.length>0) {
      const uniqueTopics = Array.from(
        new Set(
          articles
            .map((art: ArticleData) => art.topic?.name)
            .filter((name): name is string => !!name) 
        )
      );
      setCountryTopics(uniqueTopics);
    } else {
      setCountryTopics([]);
    }
  }, [countryName, loadingA, articles.length]);

  const displayTopics = useMemo(() => {
    if (countryName) {
      return countryTopics;
    }
    return topics.map((t: TopicData) => t.name);
  }, [countryName, countryTopics, topics]);

  const handleTopicClick = (topicName: string) => {
    if (selectedTopic === topicName) {
      setSelectedTopic(null);
    } else {
      setSelectedTopic(topicName); 
    }
  };

  return (
    <Box sx={{ flexGrow: 0, minHeight:"2rem" }}>
      <AppBar position="static" sx={{ flexDirection: "row", p: "5px", gap: 1, background: "darkgray" }}>
        {loadingA && !loadingT ? (
          [...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              animation="wave"
              sx={{
                width: 80,
                height: 22,
                borderRadius: '16px',
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                '&::after': {
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                },
                transition: '0.5s ease-out'
              }}
            />
          ))
        ) : displayTopics && displayTopics.length > 0 && !loadingT
        ? (
          displayTopics.map((topicName:string, index:any) => {
            const isActive = selectedTopic === topicName;
            return (

                <Chip
                  key={`${topicName}-${index}`}
                  size="small"
                  label={topicName}
                  title={topicName}
                  onClick={() => handleTopicClick(topicName)}
                  variant={isActive ? "outlined" : "filled"}
                  disabled={isActive || displayTopics.length === 1}
                  sx={{ 
                    backgroundColor: isActive ? "#fff" : "",
                    color: isActive ? "gray" : "",
                    "&:hover": {
                      backgroundColor: "#fff", 
                      color: "gray"
                    },
                    "&:disabled": {
                      backgroundColor: "#fff", 
                      color: "gray"
                    }
    
                  }}
                />
            )
          })) 
          : (!loadingT && 
              <Chip
                size="small"
                label={countryName ? "No topics found" : "No topics available"}
                sx={{ opacity: 0.6 }}
              />)
        }
      </AppBar>
    </Box>
  )
}

export default Header;
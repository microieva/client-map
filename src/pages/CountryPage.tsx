import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Backdrop, Box, CircularProgress, Container } from '@mui/material';
import { useApi } from '../context/ApiContext';
import { ArticleData } from '../types/api';
import {Articles, Header, PageHeader } from '../components/layout';
import { useApp } from '../context/AppContext';

const CountryPage = ({ids}:{ids?:string[]}) => {

  const { countryName } = useParams<{ countryName: string }>();
  const {getArticles, articles} = useApi();
  const [filteredArticles, setFilteredArticles] = useState<ArticleData[] | null>(null);
  const {selectedTopic} = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!countryName) {
      navigate('/404', { replace: true });
    } else {
      setLoading(true);
      ids && getArticles(ids); 
      setLoading(false);
    }
  }, [ids]);

  useEffect(() => {
    if (selectedTopic) {
      const filtered = articles.filter((article: ArticleData) => {
        return article.topic?.name === selectedTopic;
      });
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [selectedTopic, articles]);
  
  const onClick = (article:ArticleData) => {
    navigate(`/article/${article.id}`)
  }

 

  return (
    <div className="country-page">
      <Backdrop
        sx={{
          zIndex:1,
          backgroundColor: 'rgb(150 150 150 / 60%)'
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> 
      <Header/>
      <Container sx={{display:"flex", alignItems:"center", flexDirection:"column", justifyContent:"space-between", minHeight:"100vh", width:"100vw" }}>
        <PageHeader countryName={countryName} numberOfArticles={articles?.length}/>
        <Box sx={{marginTop:"2rem"}}>
          {filteredArticles && <div className="page-content">
            <Articles 
              articles={filteredArticles}
              onArticleClick={onClick}
              loading={loading} 
              /> 
          </div>}

        </Box>
        
      </Container>
    </div>
  );
};

export default CountryPage;
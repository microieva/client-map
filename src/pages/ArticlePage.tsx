import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Backdrop, CircularProgress } from '@mui/material';
import { Header, PageHeader } from '../components/layout';

const ArticlePage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!articleId) {
      navigate('/404', { replace: true });
    } else {
      setLoading(false);
      setArticle(articleId);
    }
  }, []);

  return (
    <>
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
      <PageHeader/>
      <Container sx={{display:"flex", alignItems:"center", flexDirection:"column", justifyContent:"space-between", minHeight:"100vh", width:"100vw", marginTop: "4rem" }}>
        <Typography component="h4" sx={{textAlign:"center"}}>article id: {article}</Typography>
      </Container>
    </>
  )

}

export default ArticlePage;
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';
import {useRouter} from  'next/router';

import db from '../db.json';
import Widget from './../src/components/Widget';
import Link from './../src/components/Link';
import QuizLogo from './../src/components/QuizLogo';
import Footer from './../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from './../src/components/QuizBackground/index';
import Input from './../src/components/Input';
import Button from '../src/components/Button'



export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;



export default function Home() {
  const router = useRouter();
  let [name, setName] = React.useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Modelo Base</title>
      </Head>
        <QuizContainer>
        <QuizLogo />
          <Widget
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{ 
              show: { opacity: 1, y: '0' },
              hidden: {opacity: 0, y: '100%'},
             }}
             initial="hidden"
             animate="show"
          >
            <Widget.Header>
              <h1>Você acha que conhece o nordeste</h1>
            </Widget.Header>
            <Widget.Content>
                <div>
                  Teste seus conhecimentos sobre o nordeste no AllefQuiz
                </div>
              <form onSubmit={function(event) {
                event.preventDefault();
                
                router.push(`/quiz?name=${name}`)
              }}>
                <Input
                  name="nomeDoUsuario"
                  onChange={(e) =>setName(e.target.value)}
                  placeholder="Diz ai seu nome"
                  value={name}
                />
                <Button type="submit" disabled={name.length === 0}>
                  {`Jogar ${name}`}
                </Button>
              </form>
            </Widget.Content>
          </Widget>

          <Widget
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{ 
              show: { opacity: 1, y: '0' },
              hidden: {opacity: 0, y: '100%'},
              }}
              initial="hidden"
              animate="show"
          >
            <Widget.Header>
              <h1>Quisez da alegria</h1>
            </Widget.Header>
            <Widget.Content>
              <ul>
              {db.external.map((linkExterno) => {
                const [projectName, gitHubUser] = linkExterno
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('.vercel.app', '')
                .split('.');
                return(
                <li key={linkExterno}>
                  <Widget.Topic
                  as={Link}
                   href={`/quiz/${projectName}___${gitHubUser}`}>
                 {`${gitHubUser}/${projectName}`}
                  </Widget.Topic>
                </li>
                );
              })}
              </ul>
            </Widget.Content>
          </Widget>
          <Footer
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{ 
              show: { opacity: 1, y: '0' },
              hidden: {opacity: 0, y: '100%'},
              }}
              initial="hidden"
              animate="show"          
          />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/joseallef" />
    </QuizBackground>
  )
}

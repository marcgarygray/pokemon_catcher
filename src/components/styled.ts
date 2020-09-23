import styled from '@emotion/styled';
import { css } from '@emotion/core';
import DefaultContainer from '@material-ui/core/Container';
import DefaultList from '@material-ui/core/List';

export const Container = styled(DefaultContainer)<{ hideTitle?: boolean }>`
  text-align: center;
  padding-top: 48px;
  color: #1d2c5e;
  h1 {
    font-size: 3em;
    margin-bottom: 24px;
    ${p =>
      p.hideTitle &&
      css`
        display: none;
      `}
  }
  h2 {
    font-size: 2em;
    margin-bottom: 72px;
  }
  h4 {
    text-align: left;
    width: 300px;
    margin: 0 auto;
    font-size: 1.5em;
  }
  .MuiTypography-body1 {
    margin: 0 0 24px;
  }
  a.MuiTypography-root {
    background: #ffcb05;
    display: inline-block;
    border-radius: 4px;
    padding: 12px 24px;
    transition: all 0.2s ease-in-out;
    text-transform: uppercase;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    &:hover {
      background: #1d2c53;
      color: #ffcb05;
    }
  }
`;

export const List = styled(DefaultList)`
  &.MuiList-root {
    max-width: 300px;
    margin: 0 auto;
    margin-bottom: 24px;
  }
`;

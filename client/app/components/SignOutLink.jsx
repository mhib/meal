import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import './SignOutLink.scss';

const SignOutLink = () => (
  <a href="/sign_out" id="sign-out">
    Sign out&nbsp;
    <Glyphicon glyph="log-out" />
  </a>
);

export default SignOutLink;

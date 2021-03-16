import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function Error({ statusCode }) {
  const router = useRouter();

  useEffect(() => {
    router.push({
      pathname: '/',
    });
  }, []);

  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

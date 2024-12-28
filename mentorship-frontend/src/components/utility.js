
export const useTokenRefresh = () => {
    const refreshToken = async () => {
      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') })
        });
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        return data.accessToken;
      } catch (err) {
        console.error(err);
        // Handle token refresh error (e.g., logout user)
      }
    };
  
    return refreshToken;
  };


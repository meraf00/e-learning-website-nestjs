const handleError = () => {  
  return new Response(
    JSON.stringify({
      status: 400,
      message: "Network Error",
    })
  );
};

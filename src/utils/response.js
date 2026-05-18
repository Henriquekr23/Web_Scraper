export const httpResponse = {
  success: (data, status = 200) => {
    return Response.json(data, { status });
  },

  error: (message, status = 500) => {
    return Response.json({
      sucesso: false,
      erro: message
    }, { status });
  },

  notFound: () => {
    return Response.json({
      sucesso: false,
      erro: "Rota não encontrada"
    }, { status: 404 });
  }
};

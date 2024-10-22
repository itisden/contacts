import { useState } from "react";

type MutationFunction<TVariables, TResponse> = (
  variables: TVariables,
) => Promise<TResponse>;

const useMutation = <TVariables, TResponse>(
  mutationFunction: MutationFunction<TVariables, TResponse>,
) => {
  const [loading, setLoading] = useState(false);

  const mutate = async (variables: TVariables) => {
    setLoading(true);

    try {
      const response = await mutationFunction(variables);
      return response;
    } finally {
      setLoading(false);
    }
  };

  return { loading, mutate };
};

export default useMutation;

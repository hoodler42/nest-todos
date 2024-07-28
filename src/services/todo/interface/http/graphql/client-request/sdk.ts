import { GraphQLClient, type RequestOptions } from "graphql-request"
import { gql } from "graphql-tag"

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: TodoGraphql;
};


export type MutationCreateTodoArgs = {
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getTodos: Array<TodoGraphql>;
};

export type TodoGraphql = {
  __typename?: 'TodoGraphql';
  id: Scalars['String']['output'];
  isCompleted: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type CreateTodoMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'TodoGraphql', id: string, title: string, isCompleted: boolean } };

export type GetTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodosQuery = { __typename?: 'Query', getTodos: Array<{ __typename?: 'TodoGraphql', id: string, title: string, isCompleted: boolean }> };


export const CreateTodoDocument = gql`
    mutation CreateTodo($title: String!) {
  createTodo(title: $title) {
    id
    title
    isCompleted
  }
}
    `;
export const GetTodosDocument = gql`
    query GetTodos {
  getTodos {
    id
    title
    isCompleted
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateTodo(variables: CreateTodoMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTodoMutation>(CreateTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateTodo', 'mutation', variables);
    },
    GetTodos(variables?: GetTodosQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetTodosQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTodosQuery>(GetTodosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTodos', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;

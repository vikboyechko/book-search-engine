import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;



export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $bookData: BookInput!){
    saveBook(userId: $userId, bookData: $bookData) {
      _id
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($userId: ID!, $bookId: ID!) {
        removeBook(userId: $userId, bookId: $bookId) {
            _id
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

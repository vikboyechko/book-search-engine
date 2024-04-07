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
  mutation saveBook($profileId: ID!, $book: BookInput!) {
    saveBook(profileId: $profileId, book: $book) {
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
    mutation removeBook($profileId: ID!, $bookId: ID!) {
        removeBook(profileId: $profileId, bookId: $bookId) {
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

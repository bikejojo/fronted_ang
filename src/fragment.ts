import { gql } from 'apollo-angular';


const FILES_DIRECTORS = gql `
    fragment FilesDirectors on Director{
        id
        name
        lastname

    }
`;

export const GET_DIRECTORS = gql `
    {
        directors{
            ...FilesDirectors
        }
    }
    ${FILES_DIRECTORS}
`;

const FILES_MOVIES = gql `
    fragment FilesMovies on Movie{
        id
        title
        genre
    }
`;

export const GET_MOVIES = gql `
    {
        movies{
            ...FilesMovies
        }
    }
    ${FILES_MOVIES}
`;

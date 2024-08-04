import { gql } from "@apollo/client";

export const USER_GAME_TITLES = gql`
  query userGameTitles($skip: Int, $take: Int, $developerEmail: String!) {
    userGameTitles(skip: $skip, take: $take, developerEmail: $developerEmail) {
      title
      _id
      genre
      gameRating
      gamePlays
      gamePlayScreenShots
      developer{
        studioName

      }
      plans {
        basic {
          price
        }
        standard {
          price
        }
        premium {
          price
        }
      }
    }
  }
`;

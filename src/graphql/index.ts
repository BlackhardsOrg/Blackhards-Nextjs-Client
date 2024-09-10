import { gql } from "@apollo/client";

export const USER_GAME_TITLES = gql`
  query userGameTitles(
    $skip: Int
    $take: Int
    $developerEmail: String!
    $genre: String
  ) {
    userGameTitles(
      skip: $skip
      take: $take
      developerEmail: $developerEmail
      genre: $genre
    ) {
      title
      _id
      genre
      gameRating
      updatedAt
      createdAt
      isOnSale
      gamePlays
      isApproved
      isOnSale
      gamePlays
      gamePlayScreenShots
      developer {
        studioName
      }

      plans {
        basic {
          price
        }
      }
    }
  }
`;

export const ALL_GAME_TITLES = gql`
  query allGameTitles(
    $skip: Int
    $take: Int
    $genre: String
    $priceMin: Int
    $priceMax: Int
    $rating: Int
    $tag: String
  ) {
    allGameTitles(
      skip: $skip
      take: $take
      genre: $genre
      priceMin: $priceMin
      priceMax: $priceMax
      rating: $rating
      tag: $tag
    ) {
      title
      _id
      genre
      gameRating
      updatedAt
      createdAt
      isOnSale
      gamePlays
      isApproved
      isOnSale
      gamePlays
      gamePlayScreenShots
      developer {
        studioName
        profileImageURL
      }

      plans {
        basic {
          price
        }
      }
    }
  }
`;

export const SINGLE_GAME_TITLE = gql`
  query fetchSingleGameTitle($id: String!) {
    gameTitle(id: $id) {
      gamePlayScreenShots
      title
      description
      _id

      id
      gamePlayScreenShots
      targetPlatform
      genre
      isApproved
      isOnSale
      gamePlays
      tags
      developer {
        studioName
      }
      plans {
        basic {
          price
          title
          description
          howLongToLaunch
          howManyCustomizations
          howManyLevels
          hasDocumentation
          hasAdminPanel
          customizationCharge
        }
        standard {
          price
          title
          description

          howLongToLaunch
          howManyCustomizations
          howManyLevels
          hasDocumentation
          hasAdminPanel
          customizationCharge
        }
        premium {
          price
          title
          description
          howLongToLaunch
          howManyCustomizations
          howManyLevels
          hasDocumentation
          hasAdminPanel
          customizationCharge
        }
      }
    }
  }
`;

export const AUCTIONS = gql`
  query fetchAuctions {
    auctions {
      _id
      id
      gametitle {
        gamePlayScreenShots
        title
        description
        tags
      }
      reservedPrice
      endTime
      startTime
      started
      updatedAt
    }
  }
`;
export const SINGLE_AUCTION = gql`
  query auction($id: String!) {
    auction(id: $id) {
      developer {
        studioName
      }
      gametitle {
        gamePlayScreenShots
        title
        description
        _id
        gamePlays
        id
        gamePlayScreenShots
        targetPlatform
        genre
        isApproved
        isOnSale
        gamePlays
        tags
      }
      id
      reservedPrice
      startTime
      started
      endTime
    }
  }
`;

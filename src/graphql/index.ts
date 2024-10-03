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
      saleType
      updatedAt
      createdAt
      isOnSale
      gamePlays
      isApproved
      isOnSale
      auction {
        reservedPrice
        startTime
        endTime
      }
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
      auctionId
      auctionData {
        reservedPrice
        endTime
        startTime
      }
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

export const FETCH_GAME_REVIEWS = gql`
  query fetchReviews($gameTitleId: String!) {
    fetchGameReviews(gameTitleId: $gameTitleId) {
      gameTitle {
        id
      }
      rating
      gameTitleId
      name
      email
      comment
      createdAt
    }
  }
`;

export const FETCH_GAME_IN_INVENTORY = gql`
  query fetchUserGamesInInventory($buyerEmail: String!) {
    fetchUserGamesInInventory(buyerEmail: $buyerEmail) {
      gameId
      packageType
      updatedAt
      packageTypeGameLink
      gametitle {
        _id
        title
        description
        gamePlayScreenShots
        genre
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
      gameFileLink
      demoLink
      gamePlayVideo
      targetPlatform
      auctionId
      auctionData {
        reservedPrice
        endTime
        startTime
        resulted
        started
        confirmed
      }
      gameRating
      genre
      isApproved
      isOnSale
      gamePlays
      tags
      developer {
        studioName
        profileImageURL
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

export const HIHGEST_BIDDER = gql`
  query highestBidder($auctionId: String!) {
    highestBidder(auctionId: $auctionId) {
      sellerEmail
      bidderEmail
      bid
  
      auctionId
    }
  }
`;

export const BID_HISTORIES = gql`
  query bids($auctionId: String!) {
    bids(auctionId: $auctionId) {
      bidder {
        studioName
        email
        profileImageURL
      }
      bid
      updatedAt
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

export const USER_AUCTIONS = gql`
  query userAuctions($developerEmail: String!) {
    userAuctions(developerEmail: $developerEmail) {
      _id
      id
      gametitle {
        _id
        gamePlayScreenShots
        title
        description
        tags
        isOnSale
        gamePlays
        genre
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

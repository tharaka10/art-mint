# nft_marketplace

BE-prod-build----gcloud builds submit --tag gcr.io/armint-8d704/server

BE-prod-deploy---gcloud run deploy server --image gcr.io/artmint-8d704/server --platform managed --region asia-south1 --allow-unauthenticated

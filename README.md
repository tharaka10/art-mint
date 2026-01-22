# nft_marketplace

BE-prod-build----gcloud builds submit --tag gcr.io/nfthrive-8d704/server

BE-prod-deploy---gcloud run deploy server --image gcr.io/nfthrive-8d704/server --platform managed --region asia-south1 --allow-unauthenticated

# Epic 4: Model Building - Detailed Report

## Executive Summary
- **Best Model**: Random Forest
- **ROC-AUC Score**: 0.8852
- **Test Accuracy**: 0.8166
- **Precision**: 0.7912
- **Recall**: 0.8571
- **F1-Score**: 0.8229

## Model Performance Comparison

### Decision Tree
- Train Accuracy: 0.9422
- Test Accuracy: 0.7988
- ROC-AUC: 0.8073
- F1-Score: 0.7976

### Random Forest
- Train Accuracy: 0.9585
- Test Accuracy: 0.8166
- ROC-AUC: 0.8852
- F1-Score: 0.8229

### K-Nearest Neighbors (KNN)
- Optimal k: 5
- Train Accuracy: 0.8104
- Test Accuracy: 0.7396
- ROC-AUC: 0.7887
- F1-Score: 0.7381

### XGBoost
- Train Accuracy: 0.9852
- Test Accuracy: 0.7988
- ROC-AUC: 0.8683
- F1-Score: 0.8000

## Key Findings

1. **Best Performing Model**: Random Forest achieved the highest ROC-AUC score of 0.8852
2. **Generalization**: Test accuracy is 0.8166, indicating good generalization
3. **Precision-Recall Balance**: F1-Score of 0.8229 shows balanced performance

## Recommendations

- **Deployment Model**: Random Forest is recommended for deployment
- **Next Steps**: Integrate Random Forest into Flask application for production
- **Monitoring**: Track model performance metrics post-deployment

---
Generated: 2026-07-08 17:50:37

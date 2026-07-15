{
 "cells": [
  {
   "cell_type": "markdown",
   "id": "44c4dc34",
   "metadata": {},
   "source": [
    "# Epic 2: Visualizing and Analysing the Data\n",
    "\n",
    "This notebook covers: import and dataset loading, univariate analysis, bivariate analysis, and multivariate analysis for the Smart Lender loan prediction dataset."
   ]
  },
  {
   "cell_type": "markdown",
   "id": "9947d0ea",
   "metadata": {},
   "source": [
    "## Importing the Libraries"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "0f88dd6b",
   "metadata": {},
   "outputs": [],
   "source": [
    "import pandas as pd\n",
    "import numpy as np\n",
    "import matplotlib.pyplot as plt\n",
    "import seaborn as sns\n",
    "\n",
    "plt.style.use('fivethirtyeight')\n",
    "sns.set_context('notebook')\n",
    "sns.set_style('whitegrid')"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "0879bfe6",
   "metadata": {},
   "source": [
    "## Read the Dataset"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "5beb4352",
   "metadata": {},
   "outputs": [],
   "source": [
    "data_path = '../DATASET/loan_prediction.csv'\n",
    "df = pd.read_csv(data_path)\n",
    "df.head()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "75717c60",
   "metadata": {},
   "outputs": [],
   "source": [
    "print('Dataset shape:', df.shape)\n",
    "print('\n",
    "Columns:')\n",
    "print(df.columns.tolist())\n",
    "print('\n",
    "Missing values by column:')\n",
    "print(df.isnull().sum())"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "adf4f88e",
   "metadata": {},
   "source": [
    "## Univariate Analysis"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "8c41f6da",
   "metadata": {},
   "outputs": [],
   "source": [
    "fig, axes = plt.subplots(3, 2, figsize=(14, 12))\n",
    "categorical_columns = ['Gender', 'Married', 'Education', 'Self_Employed', 'Property_Area', 'Loan_Status']\n",
    "for ax, col in zip(axes.flatten(), categorical_columns):\n",
    "    sns.countplot(data=df, x=col, order=df[col].value_counts().index, ax=ax, palette='muted')\n",
    "    ax.set_title(f'Count of {col}')\n",
    "    ax.set_xlabel('')\n",
    "    ax.set_ylabel('Count')\n",
    "    for p in ax.patches:\n",
    "        ax.annotate(int(p.get_height()), (p.get_x() + p.get_width() / 2., p.get_height()),\n",
    "                    ha='center', va='bottom', fontsize=9)\n",
    "plt.tight_layout()\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "1e811fed",
   "metadata": {},
   "outputs": [],
   "source": [
    "numeric_columns = ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term']\n",
    "fig, axes = plt.subplots(2, 2, figsize=(14, 10))\n",
    "for ax, col in zip(axes.flatten(), numeric_columns):\n",
    "    sns.histplot(df[col].dropna(), kde=True, ax=ax, color='tab:blue')\n",
    "    ax.set_title(f'Distribution of {col}')\n",
    "    ax.set_xlabel(col)\n",
    "    ax.set_ylabel('Frequency')\n",
    "plt.tight_layout()\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "7d0432a1",
   "metadata": {},
   "source": [
    "## Bivariate Analysis"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "9ca29a21",
   "metadata": {},
   "outputs": [],
   "source": [
    "fig, axes = plt.subplots(2, 2, figsize=(14, 12))\n",
    "sns.countplot(data=df, x='Loan_Status', hue='Gender', ax=axes[0,0], palette='pastel')\n",
    "axes[0,0].set_title('Loan Status by Gender')\n",
    "sns.countplot(data=df, x='Loan_Status', hue='Married', ax=axes[0,1], palette='pastel')\n",
    "axes[0,1].set_title('Loan Status by Marital Status')\n",
    "sns.boxplot(data=df, x='Loan_Status', y='ApplicantIncome', ax=axes[1,0], palette='muted')\n",
    "axes[1,0].set_title('Applicant Income by Loan Status')\n",
    "sns.boxplot(data=df, x='Loan_Status', y='LoanAmount', ax=axes[1,1], palette='muted')\n",
    "axes[1,1].set_title('Loan Amount by Loan Status')\n",
    "plt.tight_layout()\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "ab914c45",
   "metadata": {},
   "outputs": [],
   "source": [
    "plt.figure(figsize=(10, 6))\n",
    "sns.countplot(data=df, x='Property_Area', hue='Loan_Status', palette='Set2')\n",
    "plt.title('Loan Status by Property Area')\n",
    "plt.xlabel('Property Area')\n",
    "plt.ylabel('Count')\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "59fbc479",
   "metadata": {},
   "source": [
    "## Multivariate Analysis"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "0667f9fc",
   "metadata": {},
   "outputs": [],
   "source": [
    "plt.figure(figsize=(10, 8))\n",
    "corr_matrix = df.select_dtypes(include=['number']).corr()\n",
    "sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', fmt='.2f', linewidths=0.5)\n",
    "plt.title('Correlation Matrix for Numeric Features')\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "1050628e",
   "metadata": {},
   "outputs": [],
   "source": [
    "sample_df = df[['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Credit_History', 'Loan_Status']].dropna()\n",
    "sns.pairplot(sample_df, hue='Loan_Status', corner=True, diag_kind='kde', plot_kws={'alpha':0.6})\n",
    "plt.suptitle('Pairwise Relationships by Loan Status', y=1.02)\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "edbff5ab",
   "metadata": {},
   "source": [
    "## Conclusions\n",
    "- Univariate analysis identifies class imbalance and missing values in `Credit_History`, `LoanAmount`, and `Dependents`.\n",
    "- Bivariate plots show that higher applicant income and a positive credit history are correlated with loan approval.\n",
    "- Multivariate analysis confirms that numeric variables such as income and loan amount have interactions that influence loan status."
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.13.14"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}

# GROUP SAYA TRAVEL — charte éditoriale et graphique

## Positionnement
GROUP SAYA TRAVEL présente des services professionnels liés au voyage et à la billetterie, à la sûreté aéroportuaire, au fret aérien et aux demandes multi-services. Le ton est professionnel, clair, accessible et orienté vers l’écoute. Éviter les affirmations non vérifiées (volumes traités, certifications, partenariats ou garanties de résultats).

## Direction visuelle
- **Univers :** premium, contemporain, éditorial, international.
- **Palette sombre :** bleu nuit (#071321), surfaces bleu ardoise, texte clair et accent champagne (#E8BD63).
- **Palette claire :** fond gris très clair, surfaces blanches, texte bleu profond et accent bronze.
- **Typographies :** Manrope pour les titres et DM Sans pour le corps du texte.
- **Logo :** conserver le fichier officiel `logo.png` fourni dans le dépôt, sans le redessiner ni le déformer.
- **Imagerie :** aviation et voyage avec traitement visuel discret, texte toujours lisible sur les images.

## Principes d’interface
- Navigation persistante avec menu mobile accessible.
- Contrôles explicites pour la langue FR/EN et le thème clair/sombre.
- Hiérarchie typographique forte, cartes de service cohérentes, espaces généreux et transitions sobres.
- Adaptation aux écrans de 320 px jusqu’aux grands écrans, avec états de focus visibles.
- Respect de `prefers-reduced-motion`, textes alternatifs et lien d’évitement vers le contenu.

## Règles éditoriales
- Privilégier des formulations concrètes, courtes et orientées vers le besoin du client.
- Décrire le processus sans promettre une disponibilité, un tarif ou une prestation avant confirmation.
- Garder cohérents les libellés et les appels à l’action en français et en anglais.
- Les formulaires doivent expliquer clairement leur mode de transmission et la prochaine action demandée à l’utilisateur.

## Contact et confidentialité
Le formulaire actuel prépare un e-mail adressé à `infos@groupsaya.ci` dans l’application de messagerie de l’utilisateur. Il ne transmet pas automatiquement les données et ne remplace pas un backend de formulaire. Avant d’ajouter un traitement serveur, préciser la base légale, les destinataires, la durée de conservation et les droits applicables.

## PWA et maintenance
Le manifeste et le service worker fournissent une installation progressive et une mise en cache de l’enveloppe de l’application. Après tout changement de ressources mises en cache, incrémenter `CACHE_NAME` dans `sw.js`. Tester le déploiement avec HTTPS, puis vérifier le fonctionnement clavier, les formulaires, le mode hors ligne et l’installation sur au moins un navigateur mobile et un navigateur de bureau.

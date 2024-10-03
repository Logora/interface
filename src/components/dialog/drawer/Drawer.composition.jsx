import React, { useState } from 'react';
import { Drawer } from './Drawer';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const closeDrawer = () => {
        const event = new CustomEvent("logora:drawer:close");
        window.dispatchEvent(event);
    }

    return (
        <IconProvider library={regularIcons}>
            <div onClick={toggleDrawer} data-testid="open-button">Click here to toggle drawer</div>
            <div onClick={closeDrawer} data-testid="close-button">Click here to close drawer</div>

            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div>Drawer content</div>
            </Drawer>
        </IconProvider>
    )
};

export const DrawerWithOverlay = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const closeDrawer = () => {
        const event = new CustomEvent("logora:drawer:close");
        window.dispatchEvent(event);
    }

    return (
        <IconProvider library={regularIcons}>
            <div onClick={toggleDrawer}>Click here to toggle drawer</div>
            <div onClick={closeDrawer} data-testid="close-button">Click here to close drawer</div>

            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} enableOverlay>
                <div>Drawer content</div>
            </Drawer>
        </IconProvider>
    )
};

export const DrawerWithTitle = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <IconProvider library={regularIcons}>
            <div onClick={toggleDrawer}>Click here to toggle drawer</div>

            <Drawer isOpen={isOpen} title={"My drawer"} onClose={() => setIsOpen(false)}>
                <div>Drawer content</div>
            </Drawer>
        </IconProvider>
    )
};

export const SmallDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <IconProvider library={regularIcons}>
            <div onClick={toggleDrawer}>Click here to toggle drawer</div>

            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size={400}>
                <div>Drawer content</div>
            </Drawer>
        </IconProvider>
    )
};

export const DrawerWithScrollParagraphe = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <IconProvider library={regularIcons}>
            <div onClick={toggleDrawer}>Click here to toggle drawer</div>

            <Drawer isOpen={isOpen} title={"My drawer"} onClose={() => setIsOpen(false)}>
                <div>
                    <p>
                        Le respect est lié à la distance, la crainte et l’obéissance. Le respect dû aux personnes est garanti par le Code Civil. Le respect dû aux institutions se mérite. Les comportements irrespectueux peuvent être considérés par leurs représentants comme un outrage punissable , à quoi on oppose la liberté d’expression et la liberté de critique.
                      
                        Toute personne se trouvant en position d’autorité et estimant que ses prérogatives ne sont pas respectées, autrement dit qu’on ne lui obéit pas, qu’on ne le craint pas, qu’on rit de lui, peut invoquer l’argument du respect au nom de la communauté qu’il représente.
                      
                        Le problème surgit lorsque cette prétention à l’autorité n’est pas reconnue comme légitime par tout le monde, voire considérée comme oppressive par certains. C’est le cas, dans notre société, des autorités religieuses. Par une montée en abstraction, le délit d’outrage est revendiqué pour toutes les croyances en général, et pour la sienne en particulier.
                      
                        L’irrespect en matière religieuse est alors considéré comme une provocation, une profanation, un scandale, un blasphème qui blessent gravement le croyant, le touchent au cœur ; une insulte, un affront dont il est fondé à demander réparation devant les autorités civiles.
                      
                        Il est amplifié dans l’ensemble de la protestation, qu’il structure (souligné par nous) :

                        — L’odieuse profanation d’un Christ en croix (titre)
                        — L’art peut-il être d’un tel mauvais goût sans autre raison que de servir d’insulte.
                        — Devant le côté odieux de ce cliché qui bafoue l’image du Christ sur la Croix, cœur de notre foi chrétienne, je me dois de réagir. Toute atteinte à notre foi nous blesse, tout croyant est atteint au plus profond de sa foi.
                        — Devant la gravité d’un tel affront.
                        — Pour moi, évêque, comme pour tout chrétien et tout croyant, il s’agit là d’une provocation, d’une profanation qui nous atteint au cœur même de notre foi !
                        — La collection Lambert n’a-t-elle pas perçu qu’elle exposait une photographie qui blessait gravement tous ceux pour qui la Croix du Christ est le cœur de leur foi ? Ou bien a-t-elle voulu provoquer les croyants en bafouant ce qui pour eux est au cœur de leur vie.
                        — Une profanation grave, un scandale touchant la foi de ces croyants.
                        — [Des] photos qui portent gravement atteinte à la foi des chrétiens.
                        — Des comportements qui nous blessent au cœur de notre foi.
                      
                        “L’odieuse profanation d’un Christ en croix”, Infocatho, 14-04-2011 [4]
                      
                        Certains pays ont des lois qui considèrent que le blasphème est un crime, et punissent ce qu’elles qualifient d’irrespect envers la religion d’État. Les campagnes contre les lois sur le blasphème développent un contre-discours affirmant que ces lois sont médiévales et obscurantistes, qu’elles sont incompatibles avec les principes démocratiques de liberté d’expression et de croyance, et qu’elles rendent impossible toute recherche philosophique et historique sur les religions.
                    </p>
                </div>
            </Drawer>
        </IconProvider>
    )
};